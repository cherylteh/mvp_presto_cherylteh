import React, {useState, useEffect} from 'react';
import Report from "./Report";
import {TextField, Table, TableHead, TableBody, TableCell, TableRow, TablePagination,} from '@material-ui/core';
import {Card, Button, Grid} from '@material-ui/core';

const columns = [
    { id: "date", label: "Date", minWidth: 130},
    { id: "particular", label: "Particular", minWidth: 200},
    { id: "folio", label: "Folio", minWidth: 130},
    {id: "amount", label: "Amount\u00a0(RM)"},
];

function Transaction(props){
    let [transac, setTransac] = useState([]);
    let [input, setInput] = useState({});
    let [balance, setBalance] = useState(0);
    let [report, setReport] = useState(false);
    let [page, setPage] = useState(0);
    let [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }
   
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleInput = e => {
        console.log(e.target.name);
        setInput({...input, [e.target.name]: e.target.value});
    }

    const addTotal = (e) => {
        e.preventDefault();
        addTransac();
        setInput();
        console.log("income is added");
    }

    const handleChangeView =(report)=> {
        console.log(report, "change lah")
        setReport(report)
    }

    const reportView = () => {
        console.log("income");
        setReport(report);
      }

    const formatDate = (savedDate) => {
        if(savedDate === null) return ""; 
      
        let t = savedDate.split(/[-T:.]/)// Split timestamp into [ Y, M, D, h, m, s ]
        let newFormat = new Date(t[0], t[1]-1, t[2]);// Apply each element to the Date function
        //let newFormat = new Date(Date.UTC);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        newFormat.toLocaleDateString(undefined, options)
        //console.log(newFormat);

        return newFormat;
    }

    const handleBalance = (e) => {
        console.log(e, "Balance added");
        (e.target.value === "+") ? setBalance(balance + parseInt(input.amount)) : setBalance(balance - parseInt(input.amount));
    //    let x = input.amount;
    //    setBalance((balance + x) === true)
    }

    useEffect(() =>{
        getTransaction();
    },[])

    const getTransaction = () => {
        fetch("/transaction")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for(let i=0; i<data.length; i++){
                    let tmpDate = data[i].date;
                    data[i].date  = `${formatDate(tmpDate)}`;
                    //console.log(event[i].date);
                }
                setTransac(data);
            }) 
            .catch(error => {
                console.log(error);
            })
    }

    const addTransac = () => {
        console.log(input , "input value")
        fetch("/transaction", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/text'
            },
        
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(data => {
            setTransac(data)
            console.log("post list", data)
            props.transacList();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDelete = (id) => {
        fetch(`/transaction/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
              setTransac(data);
              
            })
            .catch(err => {
              console.log(err);
            });
    }

    // const handleChangeReport = (report) => {
    //     setReport(report);
    // }

    return (
        <div>
            <h1>CASH BOOK</h1>
            <Card className="col-ms">{balance}</Card>
           
            <div>
                <form onSubmit={addTotal}>
                    <TextField 
                    label="date"
                    type="date" 
                    name="date"
                    onChange={e => handleInput(e)}
                    />{" "}
                    &nbsp; &nbsp;

                    <TextField 
                    label="particular"
                    type="text" 
                    name="particular"
                    placeholder="name-details" 
                    onChange={(e) => handleInput(e)} 
                    />{" "}
                    &nbsp; &nbsp;

                    <TextField 
                    label="folio"
                    type="text"
                    name="Folio"
                    placeholder="Cash/Bank/TnG"
                    onChange={(e) => handleInput(e)}
                    />{" "}
                    &nbsp;

                    <TextField
                    label="Amount (RM)"
                    type="number" 
                    name="amount"
                    placeholder="RM0.00" 
                    onChange={(e) => handleInput(e)}
                    />
                    <input type="submit" value="+" onClick={(e) => handleBalance(e)}/>{" "}
                    &nbsp;
                    <input type="submit" value="-" onClick={(e)=> handleBalance(e)}/>{" "}
                    &nbsp;
                </form>

                {" "} &nbsp; &nbsp;
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <h3>Income List</h3>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={3}>
                        <button onClick={() => handleChangeView(true)}>Report</button>
                        {
                            (report === true) ? <Report isReport={reportView} /> : ""
                        }
                    </Grid>
                </Grid>

                <Card className="income-card">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    style={{minWidth: column.minWidth}}                     
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {/* <TableCell>Date</TableCell>
                            <TableCell>Particular</TableCell>
                            <TableCell>Folio</TableCell>
                            <TableCell>Amount RM</TableCell> */}
                        </TableHead>
                        <TableBody>
                            {transac.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage).map( e => {
                                return (
                                    <TableRow key={e.id}>
                                        <TableCell>{e.date}</TableCell>
                                        <TableCell >{e.particular}</TableCell>
                                        <TableCell>{e.folio}</TableCell>
                                        <TableCell>{e.amount_RM}</TableCell>
                                        <TableCell><Button type="click" onClick={()=> handleDelete(e.id)}>X</Button></TableCell>
                                    </TableRow>
                                )
                            })} 
                        </TableBody> 
                    </Table>
                    <TablePagination 
                    rowsPerPageOptions={[10,25,100]}
                    component="div"
                    count={transac.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>

            </div>
        </div>
    )
}

export default Transaction;
