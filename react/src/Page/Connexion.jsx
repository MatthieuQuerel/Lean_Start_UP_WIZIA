import './Style/Connexion.css'

const Connexion =()=>{
    const Connections =()=>{
        
    }
return(
   <div className="Connexion">
        <div className="CadreConnexion">
            <form>
            <h1>Connexion WIZIA</h1>
                <label>
                    Mail: 
                    <input type="text" className="Mail"/>
                </label>
                <label>
                    Password: 
                    <input type="text" className="Password"/>
                </label>
                <button onClick={Connections}>Connexion</button>
            </form>
        </div>
   </div> 
 )
};
 export default Connexion;