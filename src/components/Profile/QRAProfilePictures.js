import React from 'react'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
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

