import React from "react";
import Table from "@/components/Table";
const data = {
    headerData: ["ลำดับ","Name"],
    bodyData: [
        {
            "floor_id": 1,
            "floor_name": "floor 1"
        },
        {
            "floor_id": 2,
            "floor_name": "floor 2"
        },
        {
            "floor_id": 3,
            "floor_name": "floor 3"
        },
        {
            "floor_id": 4,
            "floor_name": "floor 4"
        }
    ]
  };
  
  const App = () => {
    return (
      <div>
        <Table headerData={data.headerData} bodyData={data.bodyData} />
      </div>
    );
  };
  
  export default App;
