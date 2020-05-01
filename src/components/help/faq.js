import React, { Fragment } from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
const PrivacyPolicy = props => (
  <Fragment>
    <div className="global-container">
      <div className="site-header">
        <AppNavigation />
      </div>
      <div className="site-left">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
      <div className="site-main"  onContextMenu={(e)=> e.preventDefault()}>
        <Header as="h2" dividing>
          Tutorial Completo
          <Header.Subheader>Explicado por Matias (LU2ACH) </Header.Subheader>
        </Header>

        <video  width="100%"  controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/tutorialCompleto_j.mp4"
            type="video/mp4"
            
            
          />
          Your browser does not support the video tag.
        </video>
        <Header as="h2" dividing>
          Preguntas Frecuentes
        </Header>
        <Header as="h3">¿Como postear un QSO?</Header>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/PostQSO_alta_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Puedo postear un QSO de otros colega/s que escucho aunque yo no
          participo del QSO?
        </Header>
        <p>
          Si podes postear a un colega o varios colegas que escuchas sin
          participar del QSO, se llama postear un LISTEN o ESCUCHA y le va a
          llegar una notificación inmediata al colega/s que escuchas avisandole
          que lo escuchaste y que tus audios y fotos ya están disponibles en la
          Web, es una acción de de gran ayuda hacia nuestro colega porque le
          damos la posibilidad de escucharse realmente como esta saliendo en
          nuestra estación.
        </p>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Post+de+una+escucha_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Puedo postear un una foto con colegas, amigos, el armado de un
          equipo, antena o promocionar una activación de radio para darlo a
          conocer a la comunidad?
        </Header>
        <p>
          Si, todos los post que no sean QSOs o LISTEN(Escuchas) son ANY y lo
          seleccionas al igual que seleccionas cuando queres postear un LISTEN.
          Este tipo de post no necesita que le ingresemos BANDA y MODE, si se le
          pueden ingresar Callsigns, por ejemplo si sacas una foto con un amigo
          esta bueno ponerle el callsign de tu amigo asi ese post lo recibe el
          tambien y no necesita buscarlo.
        </p>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/PostANY_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>
        <Header as="h3">
          ¿Quien recibe las notificaciones de mi actividad o como empiezo a
          recibir notificaciones de colegas?
        </Header>
        <p>
          Las notificacion de tu actividad que hagas en superqso las van a
          recibir todos tus seguidores y si vos queres recibir notificaciones de
          algún colega en particular solo debes empezarlo a seguir (Follow).
        </p>
        <Header as="h3">¿Como empiezo a seguir(Follow) a un colega?</Header>
        <p>Podes empezar a seguir a un colega desde la APP y la Web.</p>

        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Seguir+a+un+colega_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>
        <Header as="h3">¿Donde leo las notificaciones?</Header>
        <p>Las notificaciones se pueden leer desde la APP y la WEB. </p>
        <p>
          Desde la APP seleccionas NOTIFICATIONS y luego elegis la notificación
          que te interese para ver mas detalle de la misma.
        </p>
        <p> Desde la WEB haces click en la campanita arriba a la derecha.</p>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Leer+notificaciones_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Puedo imprimir la tarjeta QSL de mis QSOs y LISTENs(Escuchas) ?
        </Header>
        <p>
          Si, se puede imprimir la tarjeta QSL de todos los posts (Qsos, LISTEN
          y ANY).
        </p>
        <p>
          Te posicionas en el POST que queres imprimir la tarjeta (tenes que
          haber creado vos el post o figurar en los callsigns que integran el
          POST para poder imprimir la tarjeta), presionas los 3 puntitos de la
          derecha del POST y seleccionas PRINT QSL CARD, luego otra vez PRINT
          QSL CARD. (Recorda que debes tener habilitados los POPUPS en el
          navegador WEB par que se puede generar el PDF de la tarjeta QSL)
        </p>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Imprimir+tarjeta+QSL_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Como ESCANEO el codigo QR de mi tarjeta QSL para poder recuperar las
          fotos y audios del POST?
        </Header>
        <p>
          En la APP, seleccionas SCAN, luego SCAN QSL CARD y apuntas la camara
          del celular al codigo QR de la tarjeta.
        </p>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Escanear+c%C3%B3digo+QR+de+tarjeta+QSL_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Puedo compartir en WhatsAPP u otra red social un POST que acabo de
          hacer estando en la APP?
        </Header>
        <p>
          Si, ni bien se envia un POST en la APP aparecerá el icono de
          Share(Compartir), presionando sobre ese icono se puede compartir el
          POST.
        </p>

        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Compartir+en+redes+sociales+desde+la+APP_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>
        <Header as="h3">
          ¿Puedo compartir en WhatsAPP u otra red social un POST desde la WEB?
        </Header>
        <p>
          Si, para compartir el post desde la WEB estando en el POST se debe
          hacer click en compartir.
        </p>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Compartir+en+redes+sociales+desde+la+Web_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Como hago para hacer un comentarios, repostear o poner me gusta en un
          POST?
        </Header>
        <video width="100%" controls controlsList="nodownload">
          <source
            src="https://d30o7j00smmz5f.cloudfront.net/faq/Comentar%2C+Like+y+Repostear_j.mp4"
            type="video/mp4"
            controlsList="nodownload"
          />
          Your browser does not support the video tag.
        </video>

        <Header as="h3">
          ¿Puedo postear a un colega que no este registrado en SuperQSO?
        </Header>
        <p>
          Si, se puede y es normal, por supuesto que el colega no va a recibir
          ninguna notificación al respecto porque aun no es usuario de la APP.
        </p>

        <Header as="h3">
          ¿Un colega no registrado puede entrar a superqso.com y ver el posteo
          que recien hice?
        </Header>
        <p>
          Si, no hace falta estar registrado para ver los posteos, puede entrar
          y buscar tu posteo por tu callsign o la callsign de el si es que lo
          ingresaste a el en el callsign del posteo. Lo que no va a poder hacer
          es hacer likes, comentarios y va a ver información limitada dentro de
          superqso hasta que se registre.
        </p>
      </div>
      <div className="site-right">
        <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
      </div>
    </div>
  </Fragment>
);
export default PrivacyPolicy;
