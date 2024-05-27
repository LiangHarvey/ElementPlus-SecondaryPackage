export interface CityName {
    id: number,
    spell: string,
    name: string
}

export interface ProvinceName {
    name: string,
    id?: string,
    data: string[]
}