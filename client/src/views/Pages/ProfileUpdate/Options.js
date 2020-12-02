import React from "react";

const SexOptions = ({ options, onChange, selected }) => {
  return (
    <div className="pollOption">
      {options.map((choice, index) => (
        <label key={index}>
        <input type="radio" 
          
          value={choice.value} 
          key={index}
          checked={selected === choice.value}
          onChange={(e) => onChange(e, "sex")}/>
          {choice.text}
        </label>
      ))}  
    </div>
  );
}

export default SexOptions;