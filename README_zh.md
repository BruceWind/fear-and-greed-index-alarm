# Fear-And-Greed Index Alarm

### background
Fear-And-Greed指数在投资和交易中具有重要的作用。它是一种衡量市场情绪和投资者情绪的指标，可以帮助用户更好地理解市场的风险和机会。通过关注贪婪指数，您可以获得对市场参与者情绪的洞察，从而做出更明智的投资决策。

当市场处于极度贪婪的状态时，投资者往往过度乐观，可能导致资产价格过高，存在泡沫风险。相反，当市场极度恐惧时，投资者情绪低迷，可能会错失投资机会。因此，了解贪婪指数可以帮助您避免过度乐观或过度悲观的行为，从而减少亏损的风险。

### What does this repo do?
FearNGreed Index Alarm利用 GitHub Actions 每天从 CNN 获取恐惧与贪婪指数。该指数用作市场情绪的指标。仓库包含一个脚本，用于检查获取的指数值是否超出指定的阈值范围。如果超出了定义的范围，将在 GitHub Actions 工作流中引发异常。您将收到github 发来的email通知。


今日状态: [![Today Status](https://github.com/BruceWind/fear-and-greed-index-alarm/actions/workflows/daily-cron-action.yml/badge.svg)](https://github.com/BruceWind/fear-and-greed-index-alarm/actions/workflows/daily-cron-action.yml)

## 设置

要设置 FearNGreed Index Alarm，请按照以下步骤进行操作：

1. 确保您拥有 GitHub 账户。如果没有，请在 [https://github.com](https://github.com) 上创建一个账户。
2. 点击本页面右上角的 "Fork" 按钮，将该仓库进行 Fork。
3. 在 Fork 后的仓库中，点击 "Settings" 选项卡。
4. 在 "Repository name" 下方，点击 "Secrets"。
5. 点击 "New repository secret"，添加以下的 Secrets：
   - `FNG_MIN`：恐惧与贪婪指数的最小阈值。例如 40。
   - `FNG_MAX`：恐惧与贪婪指数的最大阈值。例如 60
   确保为这些 Secrets 提供适当的值。
6. 添加完 Secrets 后，FearNGreed Index Alarm 将能够在 GitHub Actions 工作流中访问它们。

## 通知

一旦设置了 FearNGreed Index Alarm 并添加了必要的 Secrets，工作流将根据计划自动运行。如果获取的恐惧与贪婪指数超出了定义的范围，将触发通知。您可以根据自己的偏好和需求自定义通知设置。