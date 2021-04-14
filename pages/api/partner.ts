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

    const totalParticipation = db.collection('partner').aggregate([
      {
        $group: {
          _id: '12345',
          total: {
            $sum: '$participation',
          },
        },
      },
    ]);

    const arrTotalParticipation = await totalParticipation.toArray();
    const zeroArrParticipation = arrTotalParticipation[0];

    if (zeroArrParticipation !== undefined) {
      if (zeroArrParticipation.total + participation > 100) {
        res
          .status(400)
          .json({ error: 'total participation is greater than 100' });
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
