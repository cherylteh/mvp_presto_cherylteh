import React, {useState, useEffect} from 'react';
import {TextField, Table, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';
import {Card} from '@material-ui/core';



function Transaction( props){
    let [transac, setTransac] = useState([]);
    let [input, setInput] = useState({});
    // let [total, setTotal] = useState(0);
    let [balance, setBalance] = useState(0);

    const handleInput = e => {
        console.log(e.target.name);
        setInput({...input, [e.target.name]: e.target.value});
    }

    const addTotal = (e) => {
        e.preventDefault();
        addTransac(); 
        console.log("income is added");
    }

    const handleBalance = (e) => {
        (e.target.value === "+") ? setBalance(balance + parseInt(input.amount)) : setBalance(balance - parseInt(input.amount));
    //    let x = input.amount;
    //    setBalance((balance + x) === true)
    }

    useEffect(() =>{
        fetch("/transaction")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTransac(data);
            }) 
            .catch(error => {
                console.log(error);
            })
    },[])

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
            setInput(data)
            console.log(data)
            props.transacList();
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div>
            <h1>CASH BOOK</h1>
            <span><Card className="col-ms">{balance}</Card></span>
            <button>Report</button>
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

                <h5>Transaction List</h5>
                <Card className="card">
                    <Table>
                        <TableHead>
                            <TableCell>Date</TableCell>
                            <TableCell>Particular</TableCell>
                            <TableCell>Folio</TableCell>
                            <TableCell>Amount RM</TableCell>
                        </TableHead>
                        <TableBody>
                            {transac.map( e => {
                                return (
                                    <TableRow key={e.id}>
                                        <TableCell>{e.date}</TableCell>
                                        <TableCell>{e.particular}</TableCell>
                                        <TableCell>{e.folio}</TableCell>
                                        <TableCell>{e.amount_RM}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody> 
                    </Table>
                </Card>
            </div>
        </div>
    )
}

export default Transaction;
