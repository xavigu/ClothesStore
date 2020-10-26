import React from 'react'
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor(){
    super();

    this.state = {
      hasErrored: false
    }
  }
// get any error from the children that wrapped this component
 static getDerivedStateFromError(error){
  return { hasErrored: true }
 }
 componentDidCatch(error, info){
   console.log('Error boundary:', error, 'Info: ', info);
 }

 render(){
   if (this.state.hasErrored) {
     return (
       <ErrorImageOverlay>
         <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'/>
         <ErrorImageText>Sorry, this page is lost in space right now</ErrorImageText>
       </ErrorImageOverlay>
     )
   }

   return this.props.children;
 }
}

export default ErrorBoundary
