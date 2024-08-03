import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Confirm Message
function confirmMsg(callback) {
    // Show a custom confirm dialog with React Toastify
    const confirmToastId = toast.info('Are you sure? You won\'t be able to revert this!', {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: true,
      closeButton: true,
      draggable: false,
      onClose: () => callback(false),
    });
  
    // Add buttons to the toast
    document.querySelector(`.Toastify__toast--info`)?.insertAdjacentHTML('beforeend', `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button style="margin-right: 10px;" onclick="document.dispatchEvent(new Event('confirmYes'))">Yes, delete it!</button>
        <button onclick="document.dispatchEvent(new Event('confirmNo'))">Cancel</button>
      </div>
    `);
  
    // Handle confirmation
    const handleConfirm = (event) => {
      if (event.type === 'confirmYes') {
        toast.dismiss(confirmToastId);
        callback(true);
      } else if (event.type === 'confirmNo') {
        toast.dismiss(confirmToastId);
        callback(false);
      }
    };
  
    document.addEventListener('confirmYes', handleConfirm);
    document.addEventListener('confirmNo', handleConfirm);
  }
  
// Success Message
function successMsg(msg) {
  console.log("succ message");
  toast.success(msg, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: true,
    closeButton: true,
    pauseOnHover: false,
  });
}

// Error Message
function errorMsg(msg) {
  console.log("errorMessage")
  toast.error(msg, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: true,
    closeButton: true,
    pauseOnHover: false,
  });
}


// Export functions
export { successMsg, errorMsg, confirmMsg };
