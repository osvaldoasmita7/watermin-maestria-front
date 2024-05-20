export const useForm = () => {
  const onFinish = (values: any, callback?: (values: any) => void) => {
    if (callback) callback(values);
  };
  const onFinishFailed = (
    errorInfo: any,
    callback?: (errorInfo: any) => void
  ) => {
    console.log("Failed:", errorInfo);
    if (callback) callback(errorInfo);
  };
  return { onFinish, onFinishFailed };
};
