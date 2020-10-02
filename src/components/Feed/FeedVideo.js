import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.css';
const useResize = (myRef, measure) => {
  const [width, setWidth] = useState(0);

  const measureAgain = useCallback(measure, []);
  useEffect(() => {
    setWidth(myRef.current.offsetWidth);

    const handleResize = () => {
      measureAgain();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef, measureAgain]);

  return { width };
};
export const FeedVideo = props => {
  const componentRef = useRef();
  const { width } = useResize(componentRef, props.measure);
  useEffect(() => {
    props.measure();
  });

  return (
    <div style={{ width: '100%' }} ref={componentRef}>
      <video
        id="my-video"
        className="video-js"
        controls
        preload="metadata"
        responsive="true"
        width={width}
        height={(props.media.height * width) / props.media.width}
        poster={props.media.videoPreview}
      >
        <source src={props.media.url} type="video/mp4" />
      </video>
    </div>
  );
};
