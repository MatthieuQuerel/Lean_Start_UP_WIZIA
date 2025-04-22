import React, { useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import des styles
import 'react-date-range/dist/theme/default.css';


const Marronniers = ({ onDateChange }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const handleSelect = (ranges) => {
       const selection = ranges.selection;
    setState([selection]);
    onDateChange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
        
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

export default Marronniers;
