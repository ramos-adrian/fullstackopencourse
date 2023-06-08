const FeedbackMessage = ({feedbackMessage}) => {
    const {style, message} = feedbackMessage
    return <div className={style}>{message}</div>
}
 export default FeedbackMessage