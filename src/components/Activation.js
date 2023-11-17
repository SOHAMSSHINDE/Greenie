import {useState , useRef} from "react";
import axios from "axios";

function Activation(){
    const[name , setName] = useState("");
    const [phone , setPhone] = useState("");
    const[ans , setAns] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const rId = useRef();
    const rName = useRef();
    const rEmail = useRef();
    const rPhone = useRef();

    const hName = (event) =>{setName(event.target.value);}
    const hEmail = (event) =>{setEmail(event.target.value);}
    const hPhone = (event) =>{setPhone(event.target.value);}
    const hId = (event) =>{setId(event.target.value);}
    
    // const find = (event)=>{
    //     event.preventDefault();
    //     if((name ==="")||(name.trim() ==="")||(!name.match(/^[A-Za-z]+$/))){
    //         alert("invalid name");
    //         setName("");
    //         setAns("");
    //         rName.current.focus();
    //         return;
    //     }
    //     else {};
    //     // let msg="name =" +name + " phone " +phone;
    //     // setAns(msg);
    // }
    const save =(event) => {
        event.preventDefault();
        if((email.trim() === "") ||
        !email.match(/^\S+@\S+\.\S+$/)){
            alert("empty or invalid eamil");
           
            setEmail("");
            setAns("");
            rEmail.current.focus();
            
            return;
        }else if((name ==="")||(name.trim() ==="")||(!name.match(/^[A-Za-z]+$/))){
            alert("name shold not empty and incluede only chars ");
            setName("");
            rName.current.focus();
        }
        else if((phone ==="")||(phone.trim() ==="")){
            alert("empty phone");
            setPhone("");
            rPhone.current.focus();
           
        }
        else if((id ==="")||(phone.trim() ==="")){
            alert("empty id");
            setId("");
            rId.current.focus();
           
        }
        
        else {let data = {id,email,name , phone  };
        let urladd = "http://localhost:9000/save";
        axios.post(urladd , data)
        .then(res=>{
            if(res.data.affectedRows===1){
                // setAns("recorded Updated");
                alert("record updated successfully");
                setName("");
                setPhone("");
                setEmail("");
                setId("");
                
            }
            else if (res.data === "Email already exists") {
                alert("Email already exists");
              } 
            else{
                setAns(email + " unknown error");
                setName("");
                setPhone("");
            }
        })
        .catch(err => {
            if(err.code==="ERR_NETWORK")
            setAns("Please try after sometime");
        })};
        


    }
    
    return(
        <>
        <center>
            <h1>Account Creation</h1>
            <form onSubmit={save}>
                <input type="text" placeholder="enter ur name" onChange={hName}
                ref={rName} value={name}/>
                <br/><br/>
                <input type="email" placeholder="Enter your email" onChange={hEmail} ref={rEmail} value={email}
        />
        <br/><br/>
                <input type="text"  placeholder="enter ur phone" value={phone} ref={rPhone} onChange={hPhone}/>
                <br/><br/>
                <input type="text"  placeholder="enter ur id" value={id} ref={rId} onChange={hId}/>
                <br/><br/>
                
                <input type="submit" value="Save"/>
                
            </form>
            <h1>{ans}</h1>
        </center>
        </>
    );
}
export default Activation;