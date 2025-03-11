import React, { useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import des styles
import 'react-date-range/dist/theme/default.css';


const Test = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const handleSelect = (ranges) => {
        //console.log(ranges);
        setState([ranges.selection]);
        console.log( ranges.selection);
        
    };
    return (
        <div>
            <DateRange
                onChange={handleSelect}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
            />
            
            {state.map((range) => (
                <div key={range.key}>
                    <p>Date de début : {range.startDate.toDateString()}</p>
                    <p>Date de fin : {range.endDate.toDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Test;
