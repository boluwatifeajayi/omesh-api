// import React, { useState, useEffect } from 'react';
// import Sidebar from "../components/Sidebar";
// import './Style.css';
// import axios from "axios";

// const API_URL = 'http://localhost:3000/api/credits';

// export default function Credits(){  

//         const [credits, setCredits] = useState([]); 
//         const fetchData = async () => {
//             const { data } = await axios.get(API_URL);
//             setCredits(data);
//         };

//         useEffect(() => {
//             fetchData();
//         }, []);
//     return(
//         <div>
//             <Sidebar/>
//             <div className="screen">
//                 <h1>Applied Credits</h1>
//                 {credits.length > 0 ? (
//                 <div className="creditList">
                    
//                 {credits.map((credit) => (
//                     <div class="credit-item">
//                         <h4 className="comp">{credit.creditItem}</h4>
//                         <button className="comp comp-btn">View</button>
//                         <p className="comp comp-date">{credit.payback}</p>
//                     </div>
//                  ))}
//                 </div>
//                 ) : (
//                     <p className="loading">Loading... </p>
//   )} 
//             </div>

            
//         </div>
//     )
// }


import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreditItem from '../components/CreditItem';
import CreditForm from '../components/CreditForm';
import { getCredits } from '../actions/credit';
// import './creditstyle.css';

const Credits = ({ getCredits, credit: { credits } }) => {
  useEffect(() => {
    getCredits();
  }, [getCredits]);

  return (
    <section className="container">
      <h1 className="large text-primary">Credits</h1>
      <p className="lead">
        <i className="fas fa-user"/> Welcome to the community
      </p>
      {/* <CreditForm /> */}
      <div className="posts">
        {credits.map((credit) => (
          <CreditItem key={credit._id} credit={credit} />
        ))}
      </div>
    </section>
  );
};

Credits.propTypes = {
  getCredits: PropTypes.func.isRequired,
  credit: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credit: state.credit
});

export default connect(mapStateToProps, { getCredits })(Credits);
