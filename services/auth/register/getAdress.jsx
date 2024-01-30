const getAdress = async (route="") => {
    
    try {
        const adressRoute = `https://schoolapi.herokuapp.com/${route}`;
        const data = await fetch(adressRoute)
        .then(res => res.json())
        .catch(err => console.log(err))
        return data;
        
    } catch (err) {
        console.log(err)    
    }

}

export default getAdress;

