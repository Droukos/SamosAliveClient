import { User } from "@/types/index";

declare namespace AedProblems {
  type id = string;
  type title = number;
  type body = string;
  type mapX = number;
  type mapY = number;
  interface point {
    x: AedProblems.mapX;
    y: AedProblems.mapY;
  }
  type address = string;
  type aedDeviceId = string;
  type status = number;
  type uploadedTime = number[];
  type completedTime = number[];
  type technical = string;
  type conclusion = string;

  interface AedProblemsCreateDto {
    username: User.Username;
    title: AedProblems.title;
    body: AedProblems.body;
    aedDeviceId: AedProblems.aedDeviceId;
  }
  interface AedProblemsCardDto {
    id: AedProblems.id;
    username: User.Username;
    title: AedProblems.title;
    body: AedProblems.body;
    point: AedProblems.point;
    aedDeviceId: AedProblems.aedDeviceId;
    address: AedProblems.address;
    status: AedProblems.status;
    uploadedTime: AedProblems.uploadedTime;
  }
  interface AedProblemsInfoDto {
    id: AedProblems.id;
    username: User.Username;
    title: AedProblems.title;
    body: AedProblems.body;
    point: AedProblems.point;
    aedDeviceId: AedProblems.aedDeviceId;
    address: AedProblems.address;
    status: AedProblems.status;
    uploadedTime: AedProblems.uploadedTime;
    completedTime: AedProblems.completedTime;
    technical: AedProblems.technical;
    conclusion: AedProblems.conclusion;
  }
  interface AedProblemsTechnicalInfo {
    id: AedProblems.id;
    technical: AedProblems.technical;
  }
  interface AedProblemsCloseInfo {
    id: AedProblems.id;
    conclusion: AedProblems.conclusion;
  }
}
export type AedProblemsCreateDto = AedProblems.AedProblemsCreateDto;
export type AedProblemsCardDto = AedProblems.AedProblemsCardDto;
export type AedProblemsInfoDto = AedProblems.AedProblemsInfoDto;
export type AedProblemsTechnicalInfo = AedProblems.AedProblemsTechnicalInfo;
export type AedProblemsCloseInfo = AedProblems.AedProblemsCloseInfo;

export type ProblemsDto = {
  id: AedProblems.id;
};
