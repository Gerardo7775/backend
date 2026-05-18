import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// El cors: '*' permite que cualquier frontend (tu app) se conecte sin bloqueos de seguridad
@WebSocketGateway({ cors: { origin: '*' } })
export class EventosGateway {
  @WebSocketServer()
  server: Server;

  // Cuando un turista entra a la app con su folio, se une a la "sala" de ese viaje
  @SubscribeMessage('unirseAlViaje')
  handleJoinTrip(
    @MessageBody() data: { viaje_id: string; folio: string },
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(data.viaje_id);
    console.log(
      `Turista con folio ${data.folio} se unió al viaje ${data.viaje_id}`,
    );

    // Le confirmamos al turista que ya está conectado
    client.emit('conexionExitosa', { mensaje: 'Bienvenido al viaje' });
  }

  // Esta es la función que tú (el guía) usarás para detonar la alerta amarilla
  @SubscribeMessage('emitirAlertaClima')
  handleWeatherAlert(
    @MessageBody() data: { viaje_id: string; nuevoDestino: string },
  ) {
    console.log(`Emitiendo alerta amarilla para el viaje ${data.viaje_id}`);

    // El 'server.to()' envía el mensaje SOLAMENTE a los que están en ese viaje
    this.server.to(data.viaje_id).emit('alertaAmarilla', {
      tipo: 'CLIMA',
      mensaje: `¡Cambio de planes por neblina! Nos desviamos hacia: ${data.nuevoDestino}`,
    });
  }
}
