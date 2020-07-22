interface IResultObject {
    id: string,
    type: string,
    place_type: string[],
    relevance: number,
    properties: {
        accuracy: string
    },
    text: string,
    place_name: string,
    center: number[],
    geometry: {
        type: string,
        coordinates: number[]
    },
    context: {}[]
}

export default interface IGeoJson {
    type: string,
    query: string[],
    features: IResultObject[]
}