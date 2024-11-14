import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

function ToastMessage({message, type}) {

 function showToast() {
  if(type==="error"){
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  else if(type==="success"){
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
 }

 showToast(); 
  return (
    message && 
    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="light"/>
  )
}
ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
export default ToastMessage