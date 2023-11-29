import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (type: any, msg: any) => {
  //     const toastParam = {
  //     position: 'top-left',
  //     autoClose: 3000,
  //     pauseOnFocusLoss: true,
  //     pauseOnHover: false,
  //     newestOnTop: true,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     draggable: true,
  //     theme: 'colored',
  //   };

  switch (type) {
    case 'info':
      return toast.info(msg);
    case 'success':
      return toast.success(msg);
    case 'warning':
      return toast.warning(msg);
    case 'error':
      console.log('Er');
      return toast.error(msg);
    default:
      return toast.info(msg);
  }
};

export default notify;
