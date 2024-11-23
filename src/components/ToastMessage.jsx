import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

function ToastMessage({message, type}) {

 function showToast() {
  if(type==="error"){
    toast.error(message, {
      position: "top-right"
    });
  }
  else if(type==="success"){
    toast.success(message, {
      position: "top-right"
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
      closeOnClick={true}
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