const initialState = {
  uid: "",
  email: "",
  name: "",
  image: "",
  // phone: "",
  status:false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.name,
        image: action.payload.image,
        // phone: action.payload.phone,
        status:true
      };
      case "SIGN_OUT":
          return{
            ...state,
              status:false
          }
    default:
      return state;
  }
};
