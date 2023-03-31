const getRentDurationInString = rentDuration => {
  let rentDurationInStr;
  switch (rentDuration) {
    case 'hour':
      rentDurationInStr = 'hourly';
      break;
    case 'day':
      rentDurationInStr = 'daily';
      break;
    case 'week':
      rentDurationInStr = 'weekly';
      break;
    case 'month':
      rentDurationInStr = 'monthly';
      break;
    case 'year':
      rentDurationInStr = 'yearly';
      break;
    default:
      rentDurationInStr = 'monthly';
  }

  return rentDurationInStr;
};

export { getRentDurationInString };
