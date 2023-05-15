import React from 'react'
import { useState } from 'react';
import './FeaturedMovie.css'

import { Link } from 'react-router-dom';

function FeaturedMovie({ movie }) {

  const [imageLoaded, setImageLoaded] = useState(false);


  if (Object.keys(movie).length === 0) {
    return <></>;
  }

  return (
    <Link to={`/movie/${movie.id}`} >
      <div className='featured-movie-container'>

        <img src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`} 
        onLoad={() => setImageLoaded(true)}
        alt={movie.title}></img>

        { imageLoaded ? 
        <div className='featured-movie-info'>
          <h1>{movie?.title}</h1>
          <p>{movie?.overview}</p>
        </div>
        :
        <div style={{height: '700px', color: 'transparent'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat interdum neque, ac efficitur purus laoreet nec. Vestibulum et sollicitudin purus. Praesent nunc sem, vehicula et tortor sed, laoreet scelerisque sem. Quisque dolor est, viverra quis nisi dapibus, fermentum tempus quam. Curabitur at malesuada lectus. Maecenas efficitur euismod urna id euismod. Vivamus ut neque enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis venenatis, mi consequat sollicitudin eleifend, ex tellus posuere urna, vulputate ultrices neque odio quis quam. Nam nec pulvinar dolor. Morbi in congue urna. Nulla feugiat justo a scelerisque aliquam. Sed tincidunt lacus eget lacus auctor sagittis. Donec ultrices lectus sem. Donec at interdum arcu, nec interdum leo. Suspendisse eu risus quis dolor consectetur malesuada ut et nisl. Sed varius erat sit amet massa mattis, a lobortis justo gravida. Duis ultricies imperdiet fringilla. Donec porttitor, tellus quis egestas feugiat, nibh nulla tincidunt odio, at accumsan ante dui id elit. Pellentesque sed viverra odio, imperdiet tempor lectus. Aliquam congue feugiat nulla at lacinia. Morbi malesuada eros mi, in pharetra arcu gravida vel. Mauris elementum purus pharetra nulla sagittis luctus. Vivamus ac ultricies sem. Integer convallis sapien sapien, sed rutrum ante semper ut. Phasellus tellus odio, volutpat nec orci varius, venenatis consequat dui. Suspendisse tempus magna eget dictum luctus. Aliquam vitae fringilla ante. Vivamus accumsan sapien quis ipsum pellentesque, sed rhoncus justo ultricies. Pellentesque mattis libero sed lectus aliquet varius. Praesent lacus arcu, blandit et eros eu, aliquet tristique felis. Phasellus sed nulla porttitor, suscipit libero vitae, hendrerit orci. Aliquam nec hendrerit diam. Integer velit arcu, ullamcorper sed vestibulum id, convallis at neque. Maecenas tincidunt tellus diam, sit amet placerat nulla consequat nec. Suspendisse consequat tristique metus laoreet consectetur. Suspendisse sed mauris eget ex lobortis ullamcorper. Sed consequat velit sed posuere consectetur. Donec fermentum ut metus tristique elementum. Praesent vulputate malesuada neque, sit amet volutpat metus sagittis luctus. In hac habitasse platea dictumst. Maecenas turpis ipsum, tempor eget magna vitae, finibus tincidunt nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur interdum erat ut justo interdum dapibus. Aliquam quis sem sed nulla lobortis commodo vel a enim. Praesent vel diam ex. Morbi vitae diam ac ipsum porta pulvinar eget eget sem. Vivamus gravida augue vel egestas mollis. Nulla auctor pharetra tristique. Nullam at porta erat. Vestibulum tincidunt pellentesque volutpat. Nullam placerat, lacus ac cursus gravida, ante lorem auctor erat, ut condimentum libero enim vel orci. Aenean sed laoreet mauris, vel ornare lorem. Etiam ac nisl ut velit vulputate auctor molestie sit amet est. Fusce porttitor dictum iaculis. Suspendisse potenti. In iaculis pretium mi, vel pretium elit gravida ac. Donec id feugiat diam, eget eleifend elit. Sed cursus mollis condimentum. Sed sodales sem enim, et tincidunt lacus condimentum in. Nunc a mattis nisl, eu venenatis enim. Curabitur sed eros faucibus, vehicula sapien ut, mattis tellus. Vivamus lorem tortor, suscipit vel massa et, placerat egestas turpis. Cras in fringilla ligula. Donec dignissim pharetra sagittis. Quisque tempus, tellus quis ullamcorper blandit, urna purus iaculis tortor, vitae egestas dolor nisl ac lorem. Duis porttitor orci quis commodo semper. Aliquam dapibus eleifend suscipit. Donec venenatis molestie dui. Etiam vitae condimentum quam. Nunc at vehicula risus. Morbi volutpat arcu sit amet aliquet euismod. Cras vitae malesuada urna. Nam vulputate accumsan massa eu condimentum. Nam eu euismod justo. Aenean laoreet diam in velit aliquam, quis ultrices leo gravida. In hac habitasse platea dictumst. Proin rutrum augue ac dictum hendrerit. Pellentesque gravida, orci sit amet convallis pulvinar, nisi neque molestie dolor, at luctus nulla est sit amet erat. Morbi rhoncus scelerisque vestibulum. Sed ut aliquet sem, vitae laoreet erat. Sed nisi urna, sodales non condimentum id, semper sit amet metus. Ut id finibus tellus, id tempor leo. Mauris sit amet nisi hendrerit arcu egestas consequat vitae nec sem. Nullam in hendrerit lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec quis velit vel odio porta consectetur. Nullam vitae neque ante. Nam commodo odio in mauris rhoncus euismod in imperdiet nisi. Duis varius diam a felis varius, nec tincidunt dui volutpat. Nunc tempus massa nec volutpat bibendum. Vestibulum gravida ligula non euismod pulvinar. Sed congue eget nulla quis pharetra. Praesent malesuada lacus a faucibus porta. Vivamus tristique tellus nec facilisis tincidunt. Nam sed ultrices odio. Praesent at eros ut augue molestie dictum. Nam at egestas ante. Nunc vel nisl et diam placerat elementum. Maecenas et felis ac sapien congue lacinia. Maecenas vel metus elit. Vivamus congue consectetur nunc, non interdum dui hendrerit non. Aenean scelerisque lectus augue, id aliquam magna commodo eu.</div>
        }
      </div>
    </Link>
      
  )
}

export default FeaturedMovie