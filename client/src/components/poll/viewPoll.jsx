import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/polling';

class Poll extends Component {
    constructor(props) {
        super(props);

        const { params, fetchPoll } = this.props;
        fetchPoll(params.pollId);
    }

    render() {
        return (
            <div>Test</div>
            //<div className="row poll">
            //    <div class="col-sm-4">
            //        <h1>{this.props.title}</h1>
            //        <form ng-submit="submitVote()" class="ng-pristine ng-valid">
            //            <div class="form-group">
            //                <div class="row">
            //                    <div class="col-xs-12">
            //                        <div class="form-group">
            //                            <label for="votefor">I'd like to vote for...: </label>
            //                            <select id="votefor" class="form-control ng-pristine ng-untouched ng-valid" ng-model="votefor">
            //                                <option value="" disabled="disabled" selected="selected" hidden="">Choose an option...: </option>
            //                                <option ng-repeat="option in chartLabels" ng-value="option" class="ng-binding ng-scope" value="first">first</option>
            //                                <option ng-show="userId" value="===custom-option" class="ng-hide">I'd like a custom option</option>
            //                            </select>
            //                            <div class="form-group ng-hide" ng-show="votefor === '===custom-option'">
            //                                <label for="custom-option">Vote with my own option: </label>
            //                                <input id="custom-option" ng-model="voteforCustom" ng-trim="true" class="ng-pristine ng-untouched ng-valid" type="text" />
            //                            </div>
            //                        </div>
            //                    </div>
            //                    <div class="col-xs-12">
            //                        <input class="btn btn-primary btn-block" value="Submit" type="submit" />
            //                    </div>
            //                </div>
            //            </div>
            //        </form>
            //        <div class="row">
            //            <div class="col-xs-12">
            //                <blaze-template name="shareitEnh">
            //                    <div class="share-buttons ng-scope">
            //                        <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffcc-voting-arthow4n.herokuapp.com%2Fpolls%2FnebSMiKCkC8Td3zsM&amp;text=test%20test%20test%20%7C%20fcc-voting" class="btn btn-block shareit-twitter-colors tw-share"><i class="fa fa-twitter"></i> Share on Twitter</a>
            //                    </div>
            //                </blaze-template>
            //            </div>
            //        </div>
            //    </div>
            //    <div class="col-sm-8">
            //        <div class="chart-container">
            //            <canvas class="chart chart-doughnut ng-isolate-scope" chart-data="chartData" chart-labels="chartLabels" chart-legend="true" style="width: 557px; height: 278px;" height="278" width="557"></canvas>
            //            <chart-legend>
            //                <ul class="doughnut-legend"><li><span style="background-color:rgba(151,187,205,1)"></span>first</li><li><span style="background-color:rgba(220,220,220,1)"></span>second</li><li><span style="background-color:rgba(247,70,74,1)"></span>third</li><li><span style="background-color:rgba(70,191,189,1)"></span>puppies</li></ul>
            //            </chart-legend>
            //        </div>
            //        <button class="btn btn-block btn-danger ng-hide" ng-click="removePoll()" ng-show="isPollOwner">Remove this Poll</button>
            //    </div>
            //</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.communication.messages
    };
}

export default connect(mapStateToProps, actions)(Poll);