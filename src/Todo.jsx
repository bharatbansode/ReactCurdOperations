import React, { useEffect, useState } from 'react'

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

const Todo = () => {

    const imgMenu = 'https://source.unsplash.com/random';

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const inputElement = (event) =>
    {
        setInputData(event.target.value);
    }

    const addItem = () =>
    {
        if(!inputData){
            alert('Please Add Item Title Here...');    
        }
        else if (inputData && !toggleSubmit)
        {
            setItems(
                items.map((val) => {
                    if(val.id===isEditItem){
                        return {...val, name:inputData};
                    }
                    return val;
                })
            );
            
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else
        {
            const allInputData = {id: new Date().getTime().toString(), name:inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const editItem = (id) =>{
        //alert(id);
        let newEditItem = items.find((val) => {
            return val.id === id;
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    const deleteItem = (index) =>{
        const updatedItems = items.filter((val) =>{
            return index !== val.id;
        })
        setItems(updatedItems);
    }

    const removeAllItems = () => {
        alert('Deleteing All Items from List!!!');
        setItems([]);
    }

    useEffect( () => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
           <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={imgMenu} alt={imgMenu}/>
                        <figcaption>Add Your List Here ✌️ </figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add Items ..." value={inputData} onChange={inputElement} />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Items" onClick={addItem}></i> : <i className="fa fa-edit add-btn" title="Update Items" onClick={addItem}></i>
                        }
                        
                    </div>

                    <div className="showItems">
                        {
                            items.map((val) => {
                                return (
                                    <div className="eachItem" key={val.id}>
                                        <h3>{val.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Items" onClick={ () =>editItem(val.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Items" onClick={ () =>deleteItem(val.id)}></i>
                                        </div>
                                    </div>
                                );
                            })
                        }

                        
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAllItems}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>   
            </div>    
        </>
    )   
}

export default Todo;