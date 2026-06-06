export default function getErrorMessage(error) {

  const data = error.response?.data;

  if (!data) {
    return "Something went wrong";
  }

  if (typeof data === "string") {
    return data;
  }

  if (data.detail) {
    return data.detail;
  }

  if (data.non_field_errors) {
    return data.non_field_errors[0];
  }

  const firstKey = Object.keys(data)[0];

  return data[firstKey]?.[0] || "Something went wrong";
}