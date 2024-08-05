// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
// import './ProductDetails.css';

// const ProductDetails = ({ product, onBack }) => {
//   return (
//     <div className="product-details-container">
//       <Button 
//         variant="contained" 
//         onClick={onBack} 
//         style={{ marginBottom: '20px' }}
//       >
//         Back
//       </Button>
//       <Card className="product-details-card">
//         <CardMedia 
//           component="img"
//           height="400"
//           image={product.imageUrl}
//           alt={`Image of ${product.name}`}
//           sx={{ objectFit: 'contain' }}
//         />
//         <CardContent>
//           <Typography variant="h4" component="div" gutterBottom>
//             {product.name}
//           </Typography>
//           <Typography variant="h6" color="text.secondary" component="div">
//             {'\u20B9 ' + product.price}
//           </Typography>
//           <Typography variant="body1" color="text.secondary" component="div" sx={{ marginTop: '20px' }}>
//             {product.description}
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProductDetails;
