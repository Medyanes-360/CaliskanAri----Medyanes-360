import styles from './styles.module.css';

const Stepper  = ({ children, ...props }) => {

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.circleContainer} ${
            props.stepCompleted ? 'border-primary' : 'border-secondary'
          }`}
        >
          {props.showIcon ? (
            <i className={styles.icon}>{props.icon}</i>
          ) : (
            <p className={styles.number}>{props.activeTab}</p>
          )}
        </div>
        <h6
          className={`${styles.title} ${
            props.activeTitle && 'text-primary font-semibold'
          }`}
        >
          {props.title}
        </h6>
        {!props.lastStep && (
          <div className='top-0 right-0 4xl:-right-8 flex items-center justify-center h-16 -mr-24 my-20 absolute -z-10'>
            <div
              className={`${
                props.stepCompleted ? 'border-primary' : 'border-secondary'
              } 4xl:w-28 w-[11rem] h-40 4xl:h-[25rem] absolute right-0  border-l-8 rotate-90 -z-10 flex justify-center items-center`}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Stepper;
