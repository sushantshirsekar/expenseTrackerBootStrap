

const form = document.querySelector('form');


function getDetails(event){
    event.preventDefault();
    if(event.target.amount.value == '' || event.target.description.value== '' || event.target.category.value == '')
    {
        event.preventDefault();
        form.classList.add('was-validated');
        return;
    }
    const amntV = event.target.amount.value ;
    const descV =  event.target.description.value ;
    const categoryV = event.target.category.value;
    let details = {
        amntV,
        descV,
        categoryV
    }
    axios.post('https://crudcrud.com/api/3227789ad98543e589ed498ec4d5d008/appointmentData',details)
    .then((res) => {
        printDetails(res.data);
    })
    .catch((err)=> {
        console.log(err)
    })
}

window.addEventListener('DOMContentLoaded', ()=>{
    axios.get('https://crudcrud.com/api/3227789ad98543e589ed498ec4d5d008/appointmentData')
    .then((res)=>{
        for(let i = 0; i < res.data.length; i++)
        {
            printDetails(res.data[i]);
        }
    })
})
function printDetails(obj){
    document.getElementById('amnt').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('catId').value = '';
    const parentNode = document.getElementById('parent');
    const childNode = `<li class="list-group-item bg-transparent text-black text-center" style="color:white;border:none;" id=${obj._id}>
    <strong> Amount: </strong>
    ${obj.amntV} 
    <strong> Spent On: </strong>
    ${obj.descV} ${obj.categoryV}
    <div class="d-flex justify-content-center" style="border-bottom:0.5px solid black;margin-bottom:10px; border-top:none;">
    <button onclick=deleteDetails('${obj._id}') class="btn btn-sm btn-outline-danger text-center" style="margin-right:5px;margin-bottom:10px;margin-top:10px;">Delete</button>
    <button onclick=editDetails('${obj._id}') class="btn  btn-sm btn-outline-primary text-center" style="margin-bottom:10px;margin-top:10px;">Edit</button>
</div>
    </li>`
   
    
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}

function deleteDetails(id)
{
    axios.delete(`https://crudcrud.com/api/3227789ad98543e589ed498ec4d5d008/appointmentData/${id}`)
    .then((res)=>{
        console.log(res);
        removeDisplay(id);
    })
    .catch((err) => console.log(err));
}

function removeDisplay(id)
{
    let parent = document.getElementById('parent');
    let child = document.getElementById(id);
    if(child) parent.removeChild(child);
}

function editDetails(x)
{
    axios.get(`https://crudcrud.com/api/3227789ad98543e589ed498ec4d5d008/appointmentData/${x}`)
    .then((res)=> {
        document.getElementById('amnt').value = res.data.amntV;
        document.getElementById('desc').value = res.data.descV;
        document.getElementById('catId').value = res.data.categoryV;
        deleteDetails(x);
    })
    
}



