import React from 'react'
import {SvgMap} from './svg-map'

export const SvgIcon = (props) => {

    const icon = props.config || SvgMap[props.name] || SvgMap.default;
    const size = props.size || 20;

    let paths;
    if(icon.type === 'colorsIcon') {
        paths = icon.paths.map((path, idx) => {
            return (
                <path key={idx} d={path.path} fill={path.fill}></path>
            )
        })
    }
    else {
        paths = icon.paths.map((path, idx) => {
            return (
                <path key={idx} d={path}></path>
            )
        })
    }

    return (
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
            {paths}
        </svg>
    )

}