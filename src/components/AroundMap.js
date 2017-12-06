import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { POST_KEY } from '../constants';
import { AroundMarker } from './AroundMarker';



class AroundMap extends React.Component {


    render() {
        const pos = JSON.parse(localStorage.getItem(POST_KEY));
        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{lat:pos.lat, lng:pos.lon}}
            >
                {this.props.posts ? this.props.posts.map((post, index) =>
                   <AroundMarker
                       key={`${index}-${post.user}-${post.url}`}
                       post={post}/>) : null}

            </GoogleMap>
        );
    }
}
export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));


