import axios from "axios";

export const isPrimeNumber = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
};

export const isPerfectNumber = (num: number): boolean => {
    let sum = 1;
    for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) sum += i;
    }
    return sum === num;
};

export const isArmstrongNumber = (num: number): boolean => {
    const numStr = num.toString();
    const power = numStr.length;
    let sum = 0;
    for (let i = 0; i < numStr.length; i++) {
      sum += Math.pow(Number(numStr[i]), power);
    }
    return sum === num;
};

export const funFactService = async (num: number): Promise<string> => {
    const response = await axios.get(`http://numbersapi.com/${num}?type=math`);
    return response.data;
};
