import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { funFactService, isArmstrongNumber, isPerfectNumber, isPrimeNumber } from "../services";
import { successResponse } from "../helpers";

export const classifyNumberController = async (req: Request, res: Response): Promise<void> => {
    const { number } = req.query;

    const num = Number(number);
    if (isNaN(num)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            number,
            error: "Invalid number input",
        });
        return;
    }

    const properties: string[] = [];
    if (isArmstrongNumber(num)) properties.push("armstrong");
    if (num % 2 !== 0) properties.push("odd");
    else properties.push("even");

    const digitSum = Math.abs(num)
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);

    let funFact = "No fun fact available";
    try {
        funFact = await funFactService(num);
        if (typeof funFact !== "string") funFact = String(funFact);
    } catch (error) {
        console.error("Fun fact API failed", error);
    }

    const responsePayload = {
        number: num,
        is_prime: Boolean(isPrimeNumber(num)),
        is_perfect: Boolean(isPerfectNumber(num)),
        properties: Array.isArray(properties) ? properties : [],
        digit_sum: Number(digitSum),
        fun_fact: funFact,
    };

    successResponse(res, StatusCodes.OK, responsePayload);
};
