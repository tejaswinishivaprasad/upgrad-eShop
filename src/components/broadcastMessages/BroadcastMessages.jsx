import Swal from 'sweetalert2'

function successMsg(msg){
Swal.fire({
      position: 'top-right',
      icon: 'success',
      toast: true,
      title: msg,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2500
    });
}
function errorMsg(msg){
Swal.fire({
      position: 'top-right',
      icon: 'error',
      toast: true,
      title: msg,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2500
    });
}
function confirmMsg(callback) {
  Swal.fire({
    text: "Confirm Deletion?",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result)   =>  {
    callback(result);
  })
}
export {successMsg,errorMsg,confirmMsg}