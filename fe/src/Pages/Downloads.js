
import HeaderSelector from "../Components/HeaderSelector";



const styles = {
    heading: {
        fontWeight: "bold",
        fontSize: '20px',
        padding: '40px',
        marginLeft: '15px'

    },

    content: {
        fontSize: '15px',
        marginLeft: '45px'
    }


}


const Downloads = () => {


    return (
        <div>
            <HeaderSelector />
            
            <div style={{ backgroundColor: '#E5E4E2' }} >
                <br />
                <h1
                    style={{ textAlign: "center", fontWeight:'bolder' }}>
                    Downloads
                </h1>
             
            </div>
           
        </div>
    );
}

export default Downloads