import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventosGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // Objeto para llevar el control de qué viaje está ocupado (Walkie-Talkie)
  private canalOcupado: Record<string, string | null> = {};

  // Cuando alguien abre la app
  handleConnection(client: Socket) {
    console.log('Un usuario se conectó:', client.id);
  }

  // Si alguien cierra la app o se le va el internet mientras hablaba, liberamos el canal
  handleDisconnect(client: Socket) {
    console.log('Usuario desconectado:', client.id);
    for (const tripId in this.canalOcupado) {
      if (this.canalOcupado[tripId] === client.id) {
        this.canalOcupado[tripId] = null;
        this.server.to(tripId).emit('estadoCanal', { ocupado: false });
      }
    }
  }

  // ==========================================
  // 🌤️ LÓGICA DE ALERTAS (Minuto 2)
  // ==========================================
  @SubscribeMessage('unirseAlViaje')
  handleJoinTripLegacy(
    @MessageBody() data: { viaje_id: string; folio: string },
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(data.viaje_id);
    client.emit('conexionExitosa', { mensaje: 'Bienvenido al viaje' });
  }

  @SubscribeMessage('emitirAlertaClima')
  handleWeatherAlert(
    @MessageBody() data: { viaje_id: string; nuevoDestino: string },
  ) {
    this.server.to(data.viaje_id).emit('alertaAmarilla', {
      tipo: 'CLIMA',
      mensaje: `¡Cambio de planes por neblina! Nos desviamos hacia: ${data.nuevoDestino}`,
    });
  }

  // ==========================================
  // 🎙️ LÓGICA DE WALKIE-TALKIE (Minuto 3)
  // ==========================================

  @SubscribeMessage('joinTrip')
  handleJoinTripWalkie(
    @MessageBody() tripId: string,
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(tripId);
    console.log(
      `Socket ${client.id} se unió al canal de voz del viaje ${tripId}`,
    );
  }

  @SubscribeMessage('solicitarCanal')
  handleSolicitarCanal(
    @MessageBody() tripId: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.canalOcupado[tripId]) {
      // El canal está libre
      this.canalOcupado[tripId] = client.id;
      client.emit('canalConcedido');
      client.broadcast.to(tripId).emit('estadoCanal', { ocupado: true });
    } else {
      // Alguien más está hablando
      client.emit('canalDenegado');
    }
  }

  @SubscribeMessage('liberarCanal')
  handleLiberarCanal(
    @MessageBody() tripId: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (this.canalOcupado[tripId] === client.id) {
      this.canalOcupado[tripId] = null;
      this.server.to(tripId).emit('estadoCanal', { ocupado: false });
    }
  }

  @SubscribeMessage('sendAudio')
  handleSendAudio(
    @MessageBody() data: { tripId: string; [key: string]: unknown },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.to(data.tripId).emit('receiveAudio', data);
  }

  @SubscribeMessage('audioStream')
  handleAudioStream(
    @MessageBody() data: { tripId: string; chunk: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.to(data.tripId).emit('audioStream', data.chunk);
  }
}
