import { defaultCertifications } from '../data/seedData.js';

export const getCertifications = (req, res) => {
  res.json({
    success: true,
    count: defaultCertifications.length,
    data: defaultCertifications,
  });
};
