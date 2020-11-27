import { Action, Module, VuexModule } from "vuex-module-decorators";
import api from "@/plugins/api";
import { problemsApi} from "@/plugins/api/api-urls";
import {AedProblemsInfo} from "@/types";
@Module({ namespaced: true })
export default class AedProblem extends VuexModule {
    @Action
    async createAedProblems(data: AedProblemsInfo) {
        return await api.post(problemsApi.createProblems, data);
    }
}