import React from 'react'

export default function FunctionSlice(data, end) {

    return data.length > end ? data.slice(1, end) + '...' : data


}


