import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  firstName: string;
  lastName: string;
  participation: number;
  _id: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { firstName, lastName, participation } = req.body;

    if (!firstName || !lastName || !participation) {
      res.status(400).json({ error: 'Missing body paramter' });
      return;
    }

    if (participation > 100) {
      res
          .status(400)
          .json({ error: 'participation is greater than 100' });
        return;
    }

    const { db } = await connect();

    const participationTotal = db.collection('partner').aggregate([
      {
        $group: {
          _id: '12345',
          total: {
            $sum: '$participation',
          },
        },
      },
    ]);

    const ar = await participationTotal.toArray();
    const ar2 = ar[0];

    if (ar2 !== undefined) {
      if (ar2.total + participation > 100) {
        res
          .status(400)
          .json({ error: 'participation total is greater than 100' });
        return;
      }
    }
    const response = await db.collection('partner').insertOne({
      firstName,
      lastName,
      participation,
    });
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: 'Wrong request' });
  }
};
