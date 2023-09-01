
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
// importing css 
import "./mainComponent.css"

const MainComponent = () => {
   const [values, setValues] = useState([]);
   const [value, setValue] = useState("");

   const getAllNumbers = useCallback(async () => {
      // we will use nginx to redirect it to the proper URL
      const data = await axios.get("http://localhost:5001/api/values/all");
      setValues(data.data.rows.map(row => row.number));
   }, []);

   const saveNumber = useCallback(
      async event => {
         event.preventDefault();

         await axios.post("http://localhost:5001/api/values", {
            value,
         });

         console.log({ value })

         setValue("");
         getAllNumbers();
      },
      [value, getAllNumbers]
   );

   useEffect(() => {
      getAllNumbers();
   }, []);

   return (
      <div>
         <button onClick={getAllNumbers}>Get all numbers</button>
         <br />
         <span className="title">Values</span>
         <div className="values">
            {values.map(value => (
               <div className="value">{value}</div>
            ))}
         </div>
         <form className="form" onSubmit={saveNumber}>
            <label>Enter your value: </label>
            <input
               value={value}
               onChange={event => {
                  setValue(event.target.value);
               }}
            />
            <button>Submit</button>
         </form>

      </div>
   );
};

export default MainComponent;

