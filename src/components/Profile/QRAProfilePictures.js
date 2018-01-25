import React from 'react'
import {Divider, Image} from 'semantic-ui-react'

const src = 'https://react.semantic-ui.com//assets/images/wireframe/image.png';

const QRAProfilePictures = () => (


    <div>
        <Image.Group size='tiny'>
            <Image src={src} />
            <Image src={src} />
            <Image src={src} />
            <Image src={src} />
        </Image.Group>
        <Divider hidden />
        <Image.Group size='small'>
            <Image src={src} />
            <Image src={src} />
            <Image src={src} />
            <Image src={src} />
        </Image.Group>
    </div>

);
export default QRAProfilePictures

