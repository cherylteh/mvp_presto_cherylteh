import React from 'react';
import {Pie} from "react-chartjs-2";

function Report() {
    return (
        <div>
            <Pie
                width={500}
                height={300}
               
                // loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['Work', 11],
                    ['Eat', 2],
                    ['Commute', 2],
                    ['Watch TV', 2],
                    ['Sleep', 7],
                ]}
                options={{
                title: 'My Daily Activities',
                }}
                // rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default Report();