Number.prototype.toRad = function()
{
    return this * Math.PI / 180
}

export default class Utils
{
    static calculateDistance(location, destination)
    {
        const { latitude: lat1, longitude: lon1 } = location
        const { latitude: lat2, longitude: lon2 } = destination
        const R = 6371 * 1000 // radius of the earth in metres
        const dLat = (lat2 - lat1).toRad()
        const dLon = (lon2 - lon1).toRad() 
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(a ** 0.5, (1 - a) ** 0.5)
        const d = R * c
        return d
    }
}
