import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { funFactService, isArmstrongNumber, isPerfectNumber, isPrimeNumber } from "../services";
import { successResponse } from "../helpers";


export const classifyNumberController = async (req: Request, res: Response): Promise<void> => {
    const { number } = req.query;
    if (!number || isNaN(Number(number)) || parseInt(number as string, 10) < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          number,
          error: true,
        });
        return;
    }

    const num: number = parseInt(number as string, 10);
    const properties: string[] = [];
    let funFact: string;

    if (isArmstrongNumber(num)) {
        properties.push('armstrong');
    }
    if (num % 2 !== 0) {
        properties.push('odd');
    } else {
        properties.push('even');
    }

    const digitSum = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
  
    try {
        const response = await funFactService(num);
        funFact = response;
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: "An error occurred while trying to classify the number",
        });
        return;
    }

    successResponse(res, StatusCodes.OK, {
        number: num,
        is_prime: isPrimeNumber(num),
        is_perfect: isPerfectNumber(num),
        properties,
        digit_sum: digitSum,
        fun_fact: funFact,
    });

};
