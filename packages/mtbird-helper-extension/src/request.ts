import axios from 'axios';

const RequestFactory = () => {
  return {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
  };
};

export default RequestFactory;
