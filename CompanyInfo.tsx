import React,{ useCallback,useState} from "react";
import { useDropzone } from 'react-dropzone';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


 interface ISTATE{
  description:string;
  quantity:number;
  price:number
}





let CompanyInfo:React.FC=()=>{
  
    const generatePdf = async () => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const input = document.getElementById('pdf-content');
  
      if (input) {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
        pdf.save('document.pdf');
      }
    };
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(`${e?.target?.result}`);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    
  });
  const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };
  const[items,setItems]=useState<ISTATE[]>([]);
  const[newItem,setNewItem]=useState<ISTATE>({
    description:'',
    quantity:0,
    price:0
  });
  const addItems=()=>{
    setItems([...items,newItem])
    setNewItem({
      description:'',
      quantity:0,
      price:0
    })
  };
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };
  
  
    
  
    return(
        <>
        <div className="container border">
        <div className="row mt-3">
            <div className="col-md-3 mt-2">
            <div className="input-group mb-3">
            
            <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded"
            style={{ maxWidth: '100px' }}
          />
        ) : (
          <p>Drag 'n' drop an image here, or click to select one.</p>
        )}
      </div>
    </div>

  
</div>

            
           
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-4">
                <h2 className="display-3">INVOICE</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-3">
            <input className="mt-3 form-control"  type="text" name="" id="" placeholder="Your company" /><br />
        <input className="form-control" type="text" name="" id="" placeholder="your name"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="company address"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="city,state"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="country"/><br />
            </div>
        </div>

        <h5 className="bold mt-5">Bill To:</h5>
        <div className="row">
            <div className="col-md-3">
                <input className="mt-2 form-control"  type="text" name="" id="" placeholder="Your Clients Company" /><br />
        <input className=" form-control" type="text" name="" id="" placeholder="Clients address"/><br />
       
        <input className=" form-control" type="text" name="" id="" placeholder="city,state"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="country"/><br />
        
        </div>
        <div className="col-md-3"></div>
            <div className="col-md-6">
            <div className="row">
                <div className="col-md-4">
                <input className=" form-control"  type="text" name="" id="" placeholder="Invoice no:" /><br />
        <input className=" form-control" type="text" name="" id="" placeholder="Invoice Date"/><br />
       
        <input className=" form-control" type="text" name="" id="" placeholder="Due Date"/><br />
                </div>
                <div className="col-md-6">
                <input className="form-control"  type="text" name="" id="" placeholder="XYZ" /><br />
        <input className=" form-control" type="date" name="" id="" placeholder="Invoice Date"/><br />
       
        <input className=" form-control" type="date" name="" id="" placeholder="Due Date"/><br />
                </div>
            </div>
            </div>
        </div>
      
        <center><h2 className="display-6">Items Description</h2></center>
      
  <div className="row">
    <div className="col-md-6"> <div className="row">
  
  <div className="col-md-3">
    <label>Description</label>
  <input
     type="text" placeholder="description"
     value={newItem.description}
     onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
   />
  </div>
 
 
  
 <div className="col-md-3">
  <label>Quantity</label>
 <input
     type="text" placeholder="quantity"
     value={newItem.quantity}
     onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
   />
 </div>
 
 <div className="col-md-3">
 
   <label>Price</label>
   <input
     type="text" placeholder="price"
     value={newItem.price}
     onChange={(e) => setNewItem({ ...newItem, price: +e.target.value })}
   />
 
 </div>
 <div className="col-md-1"></div>
 <div className="col-md-2"><button className="btn btn-secondary fs-6" onClick={addItems}>Add Item</button>
 </div></div></div>
    <div className="col-md-6"><center>
        <table>
          <thead>
            <tr>
              <td><h5> Description</h5></td>
              <td><h5 className="ms-4"> Quantity</h5></td>
              <td><h5 className="ms-4"> Price</h5></td>
              <td><h5 className="ms-4">Total</h5></td>
            </tr>
          </thead>
  
       
  <tbody>
  {items.map((item, index) => (
      <tr key={index}>
        <td><h6 className="ms-3">{item.description}</h6></td>
        
        <td><h6 className="ms-5">{item.quantity}</h6></td>
        <td><h6 className="ms-4">${item.price}</h6></td>
        <td><h6 className="ms-4">${item.quantity * item.price}</h6></td>
      </tr>
    ))}
  </tbody>
</table>
</center></div>
  </div>
       


<div>
  

</div>

</div>





  
  


<div>
      
      <center><button onClick={generatePdf}>Generate PDF</button></center>

      <div id="pdf-content">
        {<div className="container border">
        <div className="row mt-3">
            <div className="col-md-3 mt-2">
            <div className="input-group mb-3">
            
            <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded"
            style={{ maxWidth: '100px' }}
          />
        ) : (
          <p>Drag 'n' drop an image here, or click to select one.</p>
        )}
      </div>
    </div>

  
</div>

            
           
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-4">
                <h2 className="display-3">INVOICE</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-3">
            <input className="mt-3 form-control"  type="text" name="" id="" placeholder="Your company" /><br />
        <input className="form-control" type="text" name="" id="" placeholder="your name"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="company address"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="city,state"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="country"/><br />
            </div>
        </div>

        <h5 className="bold mt-5">Bill To:</h5>
        <div className="row">
            <div className="col-md-3">
                <input className="mt-2 form-control"  type="text" name="" id="" placeholder="Your Clients Company" /><br />
        <input className=" form-control" type="text" name="" id="" placeholder="Clients address"/><br />
       
        <input className=" form-control" type="text" name="" id="" placeholder="city,state"/><br />
        <input className=" form-control" type="text" name="" id="" placeholder="country"/><br />
        
        </div>
        <div className="col-md-3"></div>
            <div className="col-md-6">
            <div className="row">
                <div className="col-md-4">
                <input className=" form-control"  type="text" name="" id="" placeholder="Invoice no:" /><br />
        <input className=" form-control" type="text" name="" id="" placeholder="Invoice Date"/><br />
       
        <input className=" form-control" type="text" name="" id="" placeholder="Due Date"/><br />
                </div>
                <div className="col-md-6">
                <input className="form-control"  type="text" name="" id="" placeholder="XYZ" /><br />
        <input className=" form-control" type="date" name="" id="" placeholder="Invoice Date"/><br />
       
        <input className=" form-control" type="date" name="" id="" placeholder="Due Date"/><br />
                </div>
            </div>
            </div>
        </div>
      
        <center><h2 className="display-6">Items Description</h2></center>
      
  <div className="row">
    <div className="col-md-6"> <div className="row">
  
  <div className="col-md-3">
    <label>Description</label>
  <input
     type="text" placeholder="description"
     value={newItem.description}
     onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
   />
  </div>
 
 
  
 <div className="col-md-3">
  <label>Quantity</label>
 <input
     type="text" placeholder="quantity"
     value={newItem.quantity}
     onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
   />
 </div>
 
 <div className="col-md-3">
 
   <label>Price</label>
   <input
     type="text" placeholder="price"
     value={newItem.price}
     onChange={(e) => setNewItem({ ...newItem, price: +e.target.value })}
   />
 
 </div>
 <div className="col-md-1"></div>
 </div></div>
    <div className="col-md-6"><center>
        <table>
          <thead>
            <tr>
              <td><h5> Description</h5></td>
              <td><h5 className="ms-4"> Quantity</h5></td>
              <td><h5 className="ms-4"> Price</h5></td>
              <td><h5 className="ms-4">Total</h5></td>
            </tr>
          </thead>
  
       
  <tbody>
  {items.map((item, index) => (
      <tr key={index}>
        <td><h6 className="ms-3">{item.description}</h6></td>
        
        <td><h6 className="ms-5">{item.quantity}</h6></td>
        <td><h6 className="ms-4">${item.price}</h6></td>
        <td><h6 className="ms-4">${item.quantity * item.price}</h6></td>
      </tr>
    ))}
  </tbody>
</table>
</center></div>
  </div>
       


<div>
  

</div>

</div>}
        
      </div>
    </div>

       
      
        
        </>
    )
};
export default CompanyInfo