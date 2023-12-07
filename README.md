[中文](/README_zh.md)
# Fear-And-Greed Index Alarm

The FearNGreed Index Alarm is an open-source repository that allows you to fetch CNN Fear and Greed Index every morning using GitHub Actions. This index serves as an indicator of market sentiment. The repository includes a script that checks whether the fetched index value is above or below a specified threshold. If it exceeds the defined range, an exception is raised within the GitHub Actions workflow. You will receive an email notification from github.

In case of out of range, you can see the error like this:
<img width="1002" alt="Screenshot 2023-12-07 at 12 53 09 PM" src="https://github.com/BruceWind/fear-and-greed-index-alarm/assets/6711309/657dee6a-4388-4bd2-aad0-88b67e1b0313">


You can also see today status: [![Today Status](https://github.com/BruceWind/fear-and-greed-index-alarm/actions/workflows/daily-cron-action.yml/badge.svg)](https://github.com/BruceWind/fear-and-greed-index-alarm/actions/workflows/daily-cron-action.yml)

## Setup

To set up the FearNGreed Index Alarm, follow these steps:

1. Make sure you have a GitHub account. If not, create one at [https://github.com](https://github.com).
2. Fork this repository by clicking the "Fork" button in the top-right corner of this page.
3. In your forked repository, go to the "Settings" tab.
4. Under "Repository name", click on "Secrets".
5. Click on "New repository secret" and add the following secrets:
   - `FNG_MIN`: The minimum threshold value for the Fear and Greed Index.
   - `FNG_MAX`: The maximum threshold value for the Fear and Greed Index.
   Make sure to provide the appropriate values for these secrets.
6. Once you have added the secrets, the FearNGreed Index Alarm will be able to access them during the GitHub Actions workflow.
7. Commit the changes to your forked repository. The GitHub Actions workflow will now be triggered according to the specified schedule.

## Notification

Once you have set up the FearNGreed Index Alarm and added the necessary secrets, the workflow will automatically run according to the schedule. If the fetched Fear and Greed Index value exceeds the defined range, a notification will be triggered. You can customize the notification settings based on your preferences and requirements.
